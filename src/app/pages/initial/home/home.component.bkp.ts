import { AfterViewInit, Component, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/models/empresa.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {
    homeActive = true;
    subscription: Subscription[] = [];
    empresa?: Empresa = new Empresa;
    colors: string[] = [];
    colorsComplementary: string[] = [];
    constructor(
        private router: Router,
        private empresaService: EmpresaService,
    ) {
        var empresa = this.empresaService.empresaSelected.subscribe(res => {
            this.empresa = res.empresa;
            if (res.empresa)
                this.initPalete(res.empresa?.logoDataUri);
        })
        this.subscription.push(empresa);

        var e = this.router.events.subscribe(res => {
            if (res instanceof NavigationEnd) {
                this.homeActive = false
                this.homeActive = res.url == '/' || res.url == '/home' || res.url == '/minha-conta' || res.url == '/minha-conta/change-password'

            }
        })
        this.subscription.push(e)
    }

    ngOnDestroy(): void {
        this.subscription.forEach(e => e.unsubscribe());
        $('.home__background').remove()
    }

//https://github.com/zygisS22/color-palette-extraction/blob/master/index.js
    initPalete(imagemUri: string) { // main
        const image = new Image();
        image.src = imagemUri;
        
        // Carrega a imagem
        image.onload = () => {
            // Insere imagem no canvas
            const canvas = document.getElementById("canvas") as any;
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0);

            /**
             * getImageData returns an array full of RGBA values
             * each pixel consists of four values: the red value of the colour, the green, the blue and the alpha
             * (transparency). For array value consistency reasons,
             * the alpha is not from 0 to 1 like it is in the RGBA of CSS, but from 0 to 255.
             */
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

            // Convert the image data to RGB values so its much simpler
            const rgbArray = this.buildRgb(imageData.data);

            /**
             * Color quantization
             * A process that reduces the number of colors used in an image
             * while trying to visually maintin the original image as much as possible
             */
            const quantColors = this.quantization(rgbArray, 0);

            // Create the HTML structure to show the color palette
            this.buildPalette(quantColors);
        };
        image.src = imagemUri;
    }
    buildPalette(colorsList: any) {

        function onlyUnique(value: any, index: any, array: any[]) {
            return array.indexOf(value) === index;
        }
        
        const orderedByColor = this.orderByLuminance(colorsList);
        const hslColors = this.RGBToHSL(orderedByColor);

        var colors: string[] = [];
        var colorsComplementary: string[] = [];
        var rgbColors: any[] = [];

        for (let i = 0; i < orderedByColor.length; i++) {
            const rgbColor = orderedByColor[i];
            const hexColor = this.rgbToHex(rgbColor);
            const hexColorComplementary = this.hslToHex(hslColors[i]);

            rgbColors.push({label: 'primary', rgb: rgbColor});
            colors.push(hexColor);
            if (i > 0) {
                // const difference = this.calculateRGBColorDifference(
                //     orderedByColor[i],
                //     orderedByColor[i - 1]
                // );

                // // if the distance is less than 120 we ommit that color
                // if (difference < 120) {
                //     continue;
                // }
            }

            // true when hsl color is not black/white/grey
            if (hslColors[i].h) {
                colorsComplementary.push(hexColorComplementary);
                var rgb = this.hexToRgb(hexColorComplementary);
                rgbColors.push({label: 'secundary', rgb});
            } 
        }

       var a = rgbColors.filter((rgb, i, array) => {
            if (i == 0) {
                return true;
            } else {
                const difference = this.calculateRGBColorDifference(
                    rgb.rgb,
                    rgbColors[i - 1].rgb
                );
                var notDuplicate = array.findIndex(x => JSON.stringify(x.rgb) == JSON.stringify(rgb.rgb)) === i;
                return difference > 100 && notDuplicate
            }
        })
        this.colors = a.filter(x => x.label == 'primary').map(x => this.rgbToHex( x.rgb))
        this.colorsComplementary = a.filter(x => x.label == 'secundary').map(x => this.rgbToHex( x.rgb))
   
    }

    //  Convert each pixel value ( number ) to hexadecimal ( string ) with base 16
    rgbToHex(pixel: any) {
        const componentToHex = (c: any) => {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        };

        var a = (
            "#" +
            componentToHex(pixel.r) +
            componentToHex(pixel.g) +
            componentToHex(pixel.b)
        ).toUpperCase();
        return a
    }

    hexToRgb(hex: any){
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Convert HSL to Hex
     * this entire formula can be found in stackoverflow, credits to @icl7126 !!!
     * https://stackoverflow.com/a/44134328/17150245
     */
    hslToHex(hslColor: any) {
        const hslColorCopy = { ...hslColor };
        hslColorCopy.l /= 100;
        const a =
            (hslColorCopy.s * Math.min(hslColorCopy.l, 1 - hslColorCopy.l)) / 100;
        const f = (n: any) => {
            const k = (n + hslColorCopy.h / 30) % 12;
            const color = hslColorCopy.l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
    };

    /**
     * Convert RGB values to HSL
     * This formula can be
     * found here https://www.niwa.nu/2013/05/math-behind-colorspace-conversions-rgb-hsl/
     */
    RGBToHSL(rgbValues: any) {
       var a = rgbValues.map((pixel: any) => {
            // first change range from 0-255 to 0 - 1
            let redOpposite = pixel.r / 255;
            let greenOpposite = pixel.g / 255;
            let blueOpposite = pixel.b / 255;

            const Cmax = Math.max(redOpposite, greenOpposite, blueOpposite);
            const Cmin = Math.min(redOpposite, greenOpposite, blueOpposite);
            const difference = Cmax - Cmin;

            let luminance = (Cmax + Cmin) / 2.0;
            let hue: number;
            let saturation: number;

            if (luminance <= 0.5) {
                saturation = difference / (Cmax + Cmin);
            } else {
                saturation = difference / (2.0 - Cmax - Cmin);
            }

            /**
             * If Red is max, then Hue = (G-B)/(max-min)
             * If Green is max, then Hue = 2.0 + (B-R)/(max-min)
             * If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
             */
            const maxColorValue = Math.max(pixel.r, pixel.g, pixel.b);

            if (maxColorValue === pixel.r) {
                hue = (greenOpposite - blueOpposite) / difference;
            } else if (maxColorValue === pixel.g) {
                hue = 2.0 + (blueOpposite - redOpposite) / difference;
            } else {
                hue = 4.0 + (greenOpposite - blueOpposite) / difference;
            }

            hue = hue * 60; // find the sector of 60 degrees to which the color belongs

            // it should be always a positive angle
            if (hue < 0) {
                hue = hue + 360;
            }

            // When all three of R, G and B are equal, we get a neutral color: white, grey or black.
            if (difference === 0) {
                return false;
            }

            return {
                h: Math.round(hue) + 180, // plus 180 degrees because that is the complementary color
                s: (saturation * 100).toFixed(2),
                l: (luminance * 100).toFixed(2),
            };
        });
        return a
    };

    

    /**
     * Using relative luminance we order the brightness of the colors
     * the fixed values and further explanation about this topic
     * can be found here -> https://en.wikipedia.org/wiki/Luma_(video)
     */
    orderByLuminance(rgbValues: any) {
        const calculateLuminance = (p: any) => {
            return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
        };

        return rgbValues.sort((p1: any, p2: any) => {
            return calculateLuminance(p2) - calculateLuminance(p1);
        });
    };

    buildRgb(imageData: any) {
        const rgbValues = [];
        // note that we are loopin every 4!
        // for every Red, Green, Blue and Alpha
        for (let i = 0; i < imageData.length; i += 4) {
            const rgb = {
                r: imageData[i],
                g: imageData[i + 1],
                b: imageData[i + 2],
            };

            rgbValues.push(rgb);
            
        }
        return rgbValues;
    };

    /**
     * Calculate the color distance or difference between 2 colors
     *
     * further explanation of this topic
     * can be found here -> https://en.wikipedia.org/wiki/Euclidean_distance
     * note: this method is not accuarate for better results use Delta-E distance metric.
     */
    calculateRGBColorDifference(color1: any, color2: any) {
        const rDifference = Math.pow(color2.r - color1.r, 2);
        const gDifference = Math.pow(color2.g - color1.g, 2);
        const bDifference = Math.pow(color2.b - color1.b, 2);

        return rDifference + gDifference + bDifference;
    };

    // returns what color channel has the biggest difference
    findBiggestColorRange(rgbValues: any) {
        /**
         * Min is initialized to the maximum value posible
         * from there we procced to find the minimum value for that color channel
         *
         * Max is initialized to the minimum value posible
         * from there we procced to fin the maximum value for that color channel
         */
        let rMin = Number.MAX_VALUE;
        let gMin = Number.MAX_VALUE;
        let bMin = Number.MAX_VALUE;

        let rMax = Number.MIN_VALUE;
        let gMax = Number.MIN_VALUE;
        let bMax = Number.MIN_VALUE;

        rgbValues.forEach((pixel: any) => {
            rMin = Math.min(rMin, pixel.r);
            gMin = Math.min(gMin, pixel.g);
            bMin = Math.min(bMin, pixel.b);

            rMax = Math.max(rMax, pixel.r);
            gMax = Math.max(gMax, pixel.g);
            bMax = Math.max(bMax, pixel.b);
        });

        const rRange = rMax - rMin;
        const gRange = gMax - gMin;
        const bRange = bMax - bMin;

        // determine which color has the biggest difference
        const biggestRange = Math.max(rRange, gRange, bRange);
        if (biggestRange === rRange) {
            return "r";
        } else if (biggestRange === gRange) {
            return "g";
        } else {
            return "b";
        }
    }

    /**
     * Median cut implementation
     * can be found here -> https://en.wikipedia.org/wiki/Median_cut
     */
    quantization(rgbValues: any, depth: any): any {
        const MAX_DEPTH = 4;

        // Base case
        if (depth === MAX_DEPTH || rgbValues.length === 0) {
            const color = rgbValues.reduce(
                (prev: any, curr: any) => {
                    prev.r += curr.r;
                    prev.g += curr.g;
                    prev.b += curr.b;

                    return prev;
                },
                {
                    r: 0,
                    g: 0,
                    b: 0,
                }
            );

            color.r = Math.round(color.r / rgbValues.length);
            color.g = Math.round(color.g / rgbValues.length);
            color.b = Math.round(color.b / rgbValues.length);

            return [color];
        }

        /**
         *  Recursively do the following:
         *  1. Find the pixel channel (red,green or blue) with biggest difference/range
         *  2. Order by this channel
         *  3. Divide in half the rgb colors list
         *  4. Repeat process again, until desired depth or base case
         */
        const componentToSortBy = this.findBiggestColorRange(rgbValues);
        rgbValues.sort((p1: any, p2: any) => {
            return p1[componentToSortBy] - p2[componentToSortBy];
        });

        const mid = rgbValues.length / 2;
        return [
            ...this.quantization(rgbValues.slice(0, mid), depth + 1),
            ...this.quantization(rgbValues.slice(mid + 1), depth + 1),
        ];
    }


}