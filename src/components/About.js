import React from "react";
import { observer, inject } from 'mobx-react';
import logoImg from '../images/logo.png'
import guardianImg from '../images/guardian.jpg'
import idImg from '../images/id.jpg'
import vogueImg from '../images/vogue.jpg'
import dazedImg from '../images/dazed.jpg'

@inject("store")
@observer
export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }

  render() {
    return (
      <div className='info'>
        <img src={logoImg} alt='logo' className='logo'/>
        <p>Lumpen is an agency with an extensive casting base comprised of exclusive Russian faces coming from all over the globe. Founded and launched by Avdotja Alexandrova in 2014.</p>

        <div className='press'>
          <p>Press:</p>
          <a href="https://www.vogue.com/article/lumpen-modeling-agency-moscow-russia"><img src={vogueImg} alt='logo' className='pressLogo'/></a>
          <a href="https://i-d.vice.com/en_uk/article/evn93m/lumpen-is-the-russian-model-agency-literally-changing-the-face-of-fashion"><img src={idImg} alt='logo' className='pressLogo'/></a>
          <a href="https://www.dazeddigital.com/fashion/article/25171/1/the-modelling-agency-repping-post-soviet-youth"><img src={dazedImg} alt='logo' className='pressLogo'/></a>
          <a href="https://www.theguardian.com/world/2015/jun/08/30-under-30-moscows-young-power-list"><img src={guardianImg} alt='logo' className='pressLogo'/></a>
        </div>

        <p>Clients:</p>
        <div className='partners'>
          424, Adidas, Alchemist, Alyx, And Re Walker, Arctic Explorer, Balenciaga, Christian Dada, Comme des Garçons, Dirk Bikkembergs, DLT, Dumitrascu, Enfants Riches Déprimés, FCUK, Gosha Rubchinskiy, Gucci, Hed Mayner, Hood By Air, Jil Sander, Jourden, Junya Watanabe, KM20, Kenzo, Lanvin, Mackintosh, Marni, Nemen, Nike, OAMC, Off-White, Puma, Rick Owens, Sever, Situationist, SV Moscow, TSUM, The Sirius, Tigran Avetisyan, Tim Coppens, Umbro, Veronique Leroy, Vetements, Vien Atelier, Vlone, Walter Van Beirendonck, Ulyana Sergeenko, Yeezy, ZDDZ, Zara
        </div>

        <p>Magazines:</p>
        <div className='partners'>
          032с, Baron Magazine, Boycott Magazine, British Vogue, Buro 24/7, Dazed, Document Journal, Double Magazine, Dust Magazine, i-D Magazine, Intersection Magazine, Glamour Russia, Grind Magazine, GQ Russia, Harper’s Bazaar Russia, Elle Russia, Fucking Young!, Flacon Magazine, King Kong Magazine, L'Officiel Hommes Germany, Man About Town, Men's Uno, Modern Weekly China, Numéro Russia, Office Magazine, Purple Magazine, Re-Edition Mag, Sicky Magazine, Sleek Magazine, SNC Russia, The Blueprint, The Stylist France, The WILD Magazine, V Magazine, VMAN, Vogue Hommes, Vogue Italia, Vogue Russia
        </div>

        <p className='footer'>Lumpen 2014-2020 ©</p>
      </div>
    );
  }
}
