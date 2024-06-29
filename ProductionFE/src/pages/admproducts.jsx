import { Helmet } from 'react-helmet-async';

import { ADMProductView } from 'src/sections/admproducts/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> ADM Products List </title>
      </Helmet>

      <ADMProductView/>
    </>
  );
}
