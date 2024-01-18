interface Person {
    nom: string;
    prenom: string;
    poste: string;
    equipe?: string;
    agence: string;
    photo_pro?: string;
    photo_fun?: string;
    description?: string;
    contact?: {
        email?: string;
        tel?: string;
        linkedin?: string;
    }
}

export default Person;
