/**
 * Load Google Maps JS API via the bootstrap loader (importLibrary + async loading).
 * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
 */

let bootstrapPromise = null;

export function getGoogleMapsApiKey() {
  return (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '').trim();
}

function injectMapsBootstrap(apiKey) {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Maps can only load in the browser'));
  }

  if (window.google?.maps?.importLibrary) {
    return Promise.resolve();
  }

  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = new Promise((resolve, reject) => {
    const inlineBootstrap = document.createElement('script');
    inlineBootstrap.textContent = `(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=\`https://maps.\${c}apis.com/maps/api/js?\`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({key:${JSON.stringify(apiKey)},v:"weekly"});`;

    inlineBootstrap.onerror = () => reject(new Error('Google Maps bootstrap failed'));
    document.head.append(inlineBootstrap);

    const waitForImportLibrary = () => {
      if (window.google?.maps?.importLibrary) {
        window.google.maps.importLibrary('maps').then(resolve).catch(reject);
        return;
      }
      requestAnimationFrame(waitForImportLibrary);
    };

    waitForImportLibrary();
  });

  return bootstrapPromise;
}

export async function loadPlacesLibrary() {
  const apiKey = getGoogleMapsApiKey();
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set');
  }

  await injectMapsBootstrap(apiKey);
  return window.google.maps.importLibrary('places');
}
