const LoadInfoDrive = async()=>{
    try {
        const response = await axios.get("https://script.google.com/macros/s/AKfycbz5lKOR_waD74HXNOyX9nxbXvbmElKNGJxoYkMjgMIFljGlKuw7pr5P0KQGAgdW-ydG/exec?action=getProducts" );
        const ListProDrive = response.data.items;
        return ListProDrive;
    } catch (error) {
        console.log('Axios error LoadInfoDrive => ', error);
    }
}

const getImgEcommerce = async (sku,posImg)=>{
    try {
        const response = await axios.get(`https://api-pe.ripley.com/marketplace/ecommerce/search/v1/pe/products/by-sku/${sku}`);
        const ListImages = response.data.images[posImg];
        return ListImages;
    } catch (error) {
        console.log('Axios error getImgEcommerce => ', error);
    }
}

const showProduct = async()=>{
    try {
        let contPro = document.getElementById('contentProductGenerados');
        let loadAnim= document.getElementById('loadAnimation');
        loadAnim.style.opacity = '1';
        loadAnim.style.display = '';
        const viewProduct = await LoadInfoDrive();
        viewProduct.map(async function(element){
            let view = await getImgEcommerce(element.sku,0);
            //console.log(view.src);
            let viewProd = `<div class="contenidoTemplate template01">
                <div class="contImg">
                    <div class="wrap-img">
                        <img loading="lazy" src="${view.src}" alt="" crossorigin="anonymous">
                    </div>
                    <div class="wrap-infoPro">
                        <p class="wrap-description">
                            ${element.nombre}
                        </p>
                        <div class="bloq-wrap">
                            <span class="wrap-price-aon best-price"><span class="aon">S/ ${element.precio_tarjeta}</span></span>
                            <span class="wrap-price-oferta">precio normal: <span class="pre_internet">S/ ${element.pre_internet}</span></span>
                            <span class="wrap-price-normal">precio antes: <span class="pre_normal">S/ ${element.pre_normal}</span></span>
                        </div
                    </div>
                </div>
            </div>`;
            document.getElementById('areaTrabajo').innerHTML += viewProd;
        });
        loadAnim.style.display = 'none';
        contPro.style.display = '';
    } catch (error) {
        console.log('Axios error showProduct => ', error);
    }

}

const showProductCanvas= ()=>{
    try{
        let loadAnim2= document.getElementById('loadAnimation2');
        let btnPrincipal= document.getElementById('showProduct');
        let contPro = document.getElementById('contentProductGenerados');
        let contPro2 = document.getElementById('contentProductCanvas');
        loadAnim2.style.opacity = '1';
        loadAnim2.style.display = '';
    setTimeout(()=>{
        const itemProduct = document.getElementsByClassName('contenidoTemplate');
        const cantElementos = itemProduct.length;
        for (let i= 0; i< cantElementos; i++){
    
            let $objetivo =  itemProduct[i];
            let $contenedorCanvas = document.querySelector(".contenedorCanvas");
            html2canvas($objetivo,{scale:1,useCORS:true,allowTaint: true}).then(canvas => {
                $contenedorCanvas.appendChild(canvas);
                let tocanvas = document.getElementsByTagName('canvas');
                
               /* let anchor = document.createElement("a");
                anchor.href=tocanvas[i].toDataURL("image/png",1);
                anchor.download = `imagen-to-${index}.png`;
                anchor.click();*/
            }); 
        }
        setTimeout(()=>{
            loadAnim2.style.display = 'none';
            contPro2.style.display = '';
            contPro.style.display = 'none';
            btnPrincipal.style.display = 'none';
        },1000)
    },1500);
    }catch(error){
        console.log('Axios error showProduct => ', error);
    }
}


const dowloadProductCanvas =()=>{
    try {
        const itemProduct = document.getElementsByClassName('contenidoTemplate');
        const cantElementos2 = itemProduct.length;
        for (let i= 0; i< cantElementos2; i++){
            let anchor = document.createElement("a");
                anchor.href=document.getElementsByTagName('canvas')[i].toDataURL("image/png",1);
                anchor.download = `imagen-to-${i}.png`;
                anchor.click();
        }
        
    } catch (error) {
        console.log('Error dowloadProductCanvas => ', error);
    }

}

const loadPage = () => {
    window.location.reload()
}


//https://api-pe.ripley.com/marketplace/ecommerce/search/v1/pe/products/by-sku/2019191402034P  =>  url Api


/*const itemProduct = document.getElementsByClassName('contenidoTemplate');
    const cantElementos2 = itemProduct.length;
    for (let i= 0; i< cantElementos2; i++){

        let anchor = document.createElement("a");
            anchor.href=document.getElementsByTagName('canvas')[i].toDataURL("image/png",1);
            anchor.download = `imagen-to-${i}.png`;
            anchor.click();
    }*/

    //Pluggin que se debe de instalar en su navegador para poder descargar los archivos
    //https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc/related