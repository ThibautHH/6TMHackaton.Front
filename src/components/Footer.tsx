import React, { FunctionComponent } from 'react';
import logoWhite from '../assets/logo-6tm-white.png';
import linkedin from '../assets/linkedin.svg';
import youtube from '../assets/ytb.svg';

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-tertiary text-white py-4">
      <div className="flex mx-auto flex-col lg:flex-row justify-between
      px-9 md:px-28 py-4">
        <div className="h-full w-fit flex-col mb-5">
          <a href='https://www.6tm.com'>
            <img
              src={logoWhite}
              alt="logo"
              className='h-full w-20'/>
          </a>
          <div className="flex flex-row gap-x-2 py-2">
            <div className='rounded-full bg-black-800 hover:opacity-70'>
              <a href='https://fr.linkedin.com/company/6tm'>
                <img
                  src={linkedin}
                  alt="linkedin"
                  className='h-full w-8'/>
              </a>
            </div>
            <div className='rounded-full bg-black-800 hover:opacity-70'>
              <a href='https://www.youtube.com/channel/UCgz-41PEgLRvT6ODmWRYLGw'>
                <img
                  src={youtube}
                  alt="youtube"
                  className='h-full w-8'/>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-x-10 gap-y-10">
          <div className="flex flex-col gap-y-1">
            <h3 className="text-lg font-bold mb-2">
              A PROPOS
            </h3>
            <a href='https://www.6tm.com/entreprise-transformation-digitale/' className={
              'transition-opacity hover:opacity-70 font-extralight'}>
                • L'entreprise
            </a>
            <a href='https://www.6tm.com/qui-sommes-nous/' className={
              'transition-opacity hover:opacity-70 font-extralight'}>
                • Qui sommes-nous
            </a>
            <a href='https://www.6tm.com/nous-contacter/' className={
              'transition-opacityhover:opacity-70 font-extralight'}>
                • Nous contacter
            </a>
          </div>

          <div className="flex flex-col gap-y-1">
            <h3 className="text-lg font-bold mb-2">
              ESPACE CARRIÈRE
            </h3>
            <a href='https://www.6tm.com/nous-rejoindre-chez-6tm/'
              className={
                'transition-opacity hover:opacity-70 font-extralight'}>
                • Nous rejoindre
            </a>
            <a href='https://www.6tm.com/blog/'
              className={'transition-opacity hover:opacity-70 font-extralight'}>
                • Le blog
            </a>
          </div>

          <div className="flex flex-col gap-y-1">
            <h3 className="text-lg font-bold mb-2">
              VOS OBJECTIFS
            </h3>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/developper-votre-business/'
              className={'transition-opacity hover:opacity-70 font-extralight'}>
                • Développer votre business
            </a>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/construisez-vos-
              logiciels-sur-mesure/'
              className={'transition-opacity hover:opacity-70 font-extralight'}>
                • Construisez vos logiciels sur mesure
            </a>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/organiser-et-optimiser-
              votre-metier/'
              className={'transition-opacity hover:opacity-70 font-extralight'}>
                • Organisez vos métiers
            </a>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/prototypez-votre-concept/'
              className={'transition-opacity hover:opacity-70 font-extralight'}>
                • Prototypez votre concept
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-center gap-x-1 px-9 py-4">
        <span className="font">© 2021 6TM - Tous droits réservés -
        Conçu avec à Rennes, Nantes, Angers et Paris
        </span>
        <a href='https://www.6tm.com/mentions-legales/' className={
          'transition-opacity hover:opacity-70 font'}>- Mentions légales
        </a>
        <a href='https://www.6tm.com/politique-de-confidentialite/' className={
          'transition-opacity hover:opacity-70 font'}>
            - Politique de confidentialité
        </a>
      </div>
    </footer>
  );
};

export default Footer;
