
const listBanner = async ()=>{
    try {

        const responseDataJson =  document.querySelectorAll(".listaSKUS")

        let listaProductos = '';
        responseDataJson.forEach(async(button, index)=>{
            /*console.log(button);
            console.log(index);*/
            let productSKU = button.getAttribute("skuProduct");
            let tipoTemplate = button.getAttribute("tipTemplate");

            let response = await fetch(`https://simple.ripley.com.pe/api/products/${productSKU}`);
            let data = await response.json();

            /*console.log("------");
            console.log(data);
            console.log("------");*/

            /*Captura de Datos*/
            const idCorta = String(data.uniqueID);
            const idLarga = String(data.partNumber);

            const nombreProducto = String(data.name);
            const descripcionCorta = String(data.shortDescription);
            const descripcionlarga = String(data.longDescription);

            const urlProducto = String(data.url);

            const precioNormal = String(data.prices.formattedListPrice);
            const precioInternet = String(data.prices.formattedOfferPrice);
            const precioOpex = String(data.prices.formattedCardPrice);
            const totalDescuento = String(data.prices.formattedDiscount);

            var precioNormalNoformat = parseInt(data.prices.listPrice);
            var preciointernetNoformat = parseInt(data.prices.offerPrice);
            var precioOpexNoformat = parseInt(data.prices.cardPrice);

            const porcentajeDescuento = parseInt(data.prices.discountPercentage);
            const puntosRipley = parseInt(data.prices.ripleyPuntos);

            const imagenThumbnail = String(data.thumbnailImage);
            const imagenCompleta = String(data.fullImage);
            const imagePosition = data.images;

            const esMarketplace = Boolean(data.isMarketplaceProduct);
            const esSinStock = Boolean(data.isOutOfStock);
            const esNoDisponible = Boolean(data.isUnavailable);

            console.log(data);
            //console.log(listaProductos);
            
            listaProductos =`<div class="contenidoTemplate ${tipoTemplate}">
                                <div class="contImg">
                                    <div class="wrap-img">
                                        <img src="${imagenThumbnail}" alt="">
                                    </div>
                                    <div class="wrap-infoPro">
                                        <p class="wrap-description">
                                            ${nombreProducto}
                                        </p>
                                        ${
                                            isNaN(precioOpexNoformat)
                                              ? `<span class="wrap-price-oferta best-price"><span class="pre_internet">${precioInternet}</span></span>
                                              <span class="wrap-price-normal">precio antes: <span class="pre_normal">${isNaN(precioNormalNoformat)? precioInternet : precioNormal} </span></span>
                                              <span class="wrap-price-aon"><span class=""></span></span>`
                                              : `<span class="wrap-price-aon best-price"><span class="aon">${precioOpex}</span></span>
                                              <span class="wrap-price-oferta">precio normal: <span class="pre_internet">${precioInternet}</span></span>
                                              <span class="wrap-price-normal">precio antes: <span class="pre_normal">${precioNormal}</span></span>`
                                          }
                                    </div>
                                </div>
                            </div>`;

                responseDataJson[index].innerHTML = listaProductos;
                /**/
                setTimeout(() => {
                    let $objetivo =  document.getElementsByClassName('contenidoTemplate')[index];
                    let $contenedorCanvas = document.querySelector(".contenedorCanvas");
        
                    html2canvas($objetivo,{scale:1,useCORS:true,allowTaint: true}).then(canvas => {
                        $contenedorCanvas.appendChild(canvas);

                        setTimeout(()=>{
                            let tocanvas = document.getElementsByTagName('canvas');
                            
                
                                let anchor = document.createElement("a");
                                anchor.href=tocanvas[index].toDataURL("image/png",1); 
                                anchor.download = `imagen-to-${index}.png`;
                                anchor.click();
                           
                         },1500);
                        /*const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                        const a = document.createElement("a");
                        a.setAttribute('download', 'my-image.png')
                        a.setAttribute('href', image)
                       
                        a.click();*/
                    });    
                }, 1500);

                
                /**/ 
        });
        console.log(listaProductos);
        console.log("------");
        //document.getElementById('areaGeneralTrabajo').innerHTML = await listaProductos;   

    } catch (error) {
        console.log("Error ==> ", error);
    }

}

listBanner();