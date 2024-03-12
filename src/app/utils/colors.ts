import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from '../models/empresa.model';

@Injectable({
    providedIn: 'root',
})
export class Colors {
    primaryColor: BehaviorSubject<string> = new BehaviorSubject<string>('');
    neutralColor: BehaviorSubject<string> = new BehaviorSubject<string>('');
    complementarColor: BehaviorSubject<string> = new BehaviorSubject<string>('');

    setColorsJquery(empresa: Empresa) {
        if (empresa && empresa.primaryColor && empresa.primaryColor.trim()) {
            this.setPrimaryColor(empresa.primaryColor)
        }
        if (empresa && empresa.secundaryColor && empresa.secundaryColor.trim()) {
            this.setNeutralColor(empresa.secundaryColor)
        }
    }

    setNeutralColor(hexColor: string) {
        if (hexColor.trim()) {
            this.neutralColor.next(hexColor);
            document.documentElement.style.setProperty('--neutral', hexColor as string);
        }
    }

    setPrimaryColor(hexColor: string) {
       if (hexColor.trim()) {
            this.primaryColor.next(hexColor);
            document.documentElement.style.setProperty('--primary', hexColor as string);
            var rgb = this.hexToRgb(hexColor);
            var hslValues = this.rgbToHsl([rgb]);
            var hslToHexValues = hslValues.filter((x: any) => x.h).map((x: any) => this.hslToHex(x));

            if (hslToHexValues.length > 0) {
                this.complementarColor.next(hslToHexValues[0])
                document.documentElement.style.setProperty('--complementar', hslToHexValues[0]);
            }
       }
    }


    componentToHex(c: any) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    rgbToHex(r: any, g: any, b: any) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    hexToRgb(hex: any) {
        if (hex.length < 7) {
            return null;
        }
        var rgb = {
            r: parseInt(hex.substring(1,3), 16),
            g: parseInt(hex.substring(3,5), 16),
            b: parseInt(hex.substring(5,8), 16)
        }
        return rgb
    }

    rgbToHsl(rgbValues: any) {
        return rgbValues.map((pixel: any) => {
            let hue = 0;
            let saturation = 0;
            let luminance = 0;

            // first change range from 0-255 to 0 - 1
            let redOpposite = pixel.r / 255;
            let greenOpposite = pixel.g / 255;
            let blueOpposite = pixel.b / 255;

            const Cmax = Math.max(redOpposite, greenOpposite, blueOpposite);
            const Cmin = Math.min(redOpposite, greenOpposite, blueOpposite);

            const difference = Cmax - Cmin;

            luminance = (Cmax + Cmin) / 2.0;

            if (luminance <= 0.5) {
                saturation = difference / (Cmax + Cmin);
            } else if (luminance >= 0.5) {
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
            } else if (maxColorValue === pixel.b) {
                hue = 4.0 + (greenOpposite - blueOpposite) / difference;
            } else {
            }

            hue = hue * 60; // find the sector of 60 degrees to which the color belongs

            // it should be always a positive angle
            if (hue < 0) {
                hue = hue + 360;
            }

            // // When all three of R, G and B are equal, we get a neutral color: white, grey or black.
            // if (difference === 0) {
            //     return false;
            // }

            var aga = Math.round(hue) + 180
            return {
                h: aga, // plus 180 degrees because that is the complementary color
                s: parseFloat((saturation * 100).toFixed(2)),
                l: parseFloat((luminance * 100).toFixed(2)),
            };
        });
    };

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


    calculateColorDifference(color1: any, color2: any) {
        const rDifference = Math.pow(color2.r - color1.r, 2);
        const gDifference = Math.pow(color2.g - color1.g, 2);
        const bDifference = Math.pow(color2.b - color1.b, 2);

        return rDifference + gDifference + bDifference;
    };


}
