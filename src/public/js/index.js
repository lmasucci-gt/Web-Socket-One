const socket = io();

socket.on("lista", (data) => {
  console.log(data);
  for (producto of data) {
    let ul = document.getElementsByTagName("ul")[0];
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `ID: ${producto.id} - Title: ${producto.title} - Price: ${producto.price} - Thumbnail: ${producto.thumbnail}`;
  }
});

socket.on("newElement", (producto) => { 
      let ul = document.getElementsByTagName("ul")[0];
      let li = document.createElement("li");
      ul.appendChild(li);
      li.innerHTML = `ID: ${producto.id} - Title: ${producto.title} - Price: ${producto.price} - Thumbnail: ${producto.thumbnail}`;
      document.getElementById("title").value = "";
      document.getElementById("price").value = "";
      document.getElementById("thumbnail").value = "";
      let p = document.getElementsByTagName("p")[0];
      notificacion = `Se agrego el producto ID: ${producto.id} - Title: ${producto.title} - Price: ${producto.price} - Thumbnail: ${producto.thumbnail}`
      p.innerHTML = notificacion;
  });


function addProducto() {    
    let titleInput = document.getElementById('title').value;
    let priceInput = document.getElementById('price').value;
    let thumbnailInput = document.getElementById('thumbnail').value;
    let producto = {
        title: titleInput,
        price: priceInput,
        thumbnail: thumbnailInput,
    }
    socket.emit('newProducto', producto);
}