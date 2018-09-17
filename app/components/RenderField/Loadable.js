/**
 *
 * Asynchronously loads the component for RenderField
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
