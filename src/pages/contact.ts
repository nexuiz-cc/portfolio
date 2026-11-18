import { mountPage } from '../lib/page';
import { renderContactPage } from '../components/contact';

mountPage('contact', ['<div class="pt-16 md:pt-20"></div>', renderContactPage()]);
