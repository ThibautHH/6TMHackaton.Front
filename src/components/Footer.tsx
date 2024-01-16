import React, { FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  return (
    <footer className="bg-tertiary text-white py-4">
      <div className="container mx-auto flex-row justify-between">
        <div className="footer-column">
          <h3 className="text-lg font-bold mb-2">A PROPOS</h3>
          <ul>
            <a href='https://www.6tm.com/entreprise-transformation-digitale/' className={
              'transition-opacity hover:opacity-70'}>L'entreprise</a>
            <a href='https://www.6tm.com/qui-sommes-nous/' className={
              'transition-opacity hover:opacity-70'}>Qui sommes-nous</a>
            <a href='https://www.6tm.com/nous-contacter/' className={
              'transition-opacityhover:opacity-70'}>Nous contacter</a>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="text-lg font-bold mb-2">ESPACE CARRIÈRE</h3>
          <ul>
            <a href='https://www.6tm.com/nous-rejoindre-chez-6tm/'
              className={
                'transition-opacity hover:opacity-70'}>Nous rejoindre</a>
            <a href='https://www.6tm.com/blog/'
              className={'transition-opacity hover:opacity-70'}>Le blog</a>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="text-lg font-bold mb-2">VOS OBJECTIFS</h3>
          <ul>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/developper-votre-business/'
              className={'transition-opacity hover:opacity-70'}>Développer votre business
            </a>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/construisez-vos-
							logiciels-sur-mesure/'
              className={'transition-opacity hover:opacity-70'}>
								Construisez vos logiciels sur mesure
            </a>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/organiser-et-optimiser-
							votre-metier/'
              className={'transition-opacity hover:opacity-70'}>
								Organisez vos métiers</a>
            <a
              href='https://www.6tm.com/vos-objectifs-digitaux/prototypez-votre-concept/'
              className={'transition-opacity hover:opacity-70'}>Prototypez votre concept
            </a>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
