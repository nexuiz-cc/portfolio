import { mountPage } from '../lib/page';
import { renderProjectDetail } from '../components/projectDetail';

const id = new URLSearchParams(window.location.search).get('id');

mountPage('works', [renderProjectDetail(id)]);
