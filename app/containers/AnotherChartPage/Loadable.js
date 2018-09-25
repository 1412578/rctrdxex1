/**
 *
 * Asynchronously loads the component for AnotherChartPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
