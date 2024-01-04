export class PerfilAcesso {
    id: number = undefined as unknown as number;
    perfil: string = '';
}


export enum Role {
    Admin = 1,
    Master = 2,
    Consultor = 3,
}

export var perfil: PerfilAcesso[] = [
    { id: 1, perfil: 'Admin' },
    { id: 2, perfil: 'Master' },
    { id: 3, perfil: 'Consultor' },
]