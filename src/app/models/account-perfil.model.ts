export class PerfilAcesso {
    id: number = undefined as unknown as number;
    perfil: string = '';
    disabled: boolean = false;
}


export enum Role {
    Admin = 1,
    Master = 2,
    Consultor = 3,
}

export var perfil: PerfilAcesso[] = [
    { id: 1, perfil: 'Admin', disabled: false },
    { id: 2, perfil: 'Master', disabled: false },
    { id: 3, perfil: 'Consultor', disabled: false },
]