import { mountPage } from '../lib/page';
import { renderAboutPage } from '../components/about';

mountPage('about', ['<div class="pt-16 md:pt-20"></div>', renderAboutPage()]);
