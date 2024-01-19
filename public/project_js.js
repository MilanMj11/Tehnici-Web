function SchimbareCuloare(){
    const sectiuneaInteractiva = document.getElementsByClassName("tabelas");
      for(let i=0;i<sectiuneaInteractiva.length;i++){
          let r = Math.floor(219+Math.random()*37);
          let g = Math.floor(179+Math.random()*77);
          let b = Math.floor(179+Math.random()*77);
          sectiuneaInteractiva[i].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
          /// 'rgb(' + r + ',' + g + ',' + b + ')'
      } 
}

window.onload = function() {
    const sectiuneaInteractiva = document.getElementsByClassName("tabelas");
    if(localStorage.getItem("culoare0") === null){
      for(let i=0;i<sectiuneaInteractiva.length;i++){
          let r = Math.floor(219+Math.random()*37);
          let g = Math.floor(179+Math.random()*77);
          let b = Math.floor(179+Math.random()*77);
          sectiuneaInteractiva[i].style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
          /// 'rgb(' + r + ',' + g + ',' + b + ')'
          localStorage.setItem("culoare"+i,'rgb(' + r + ',' + g + ',' + b + ')');
      }
    } else {
      for(let i=0;i<sectiuneaInteractiva.length;i++){
          sectiuneaInteractiva[i].style.backgroundColor = localStorage.getItem("culoare"+i);
          /// 'rgb(' + r + ',' + g + ',' + b + ')'
      }
    }
    const myInterval = setInterval(function(){
      SchimbareCuloare();
    },5000);
    setTimeout(function() {
      clearInterval(myInterval);
    }, 50000);
    const imageElement = document.getElementById("LoginIMG");
    imageElement.addEventListener('click',function(){
        const myInsert = document.createElement('input');
        myInsert.type = "text";
        myInsert.placeholder = "Enter Name";
        myInsert.id = "username";
        myInsert.name = "username";
        myDiv = document.getElementById("divCont");
        myDiv.appendChild(myInsert);
    },{ once: true });
    imageElement.addEventListener('click',function(){
        const myInsert = document.createElement('input');
        myInsert.type = "password";
        myInsert.placeholder = "Enter Password";
        myInsert.id = "password";
        myInsert.name = "password";
        myDiv = document.getElementById("divCont");
        myDiv.appendChild(myInsert);
    },{ once: true });
    imageElement.addEventListener('click', function() {
      const myInsert = document.createElement('button');
      myInsert.innerText = "Create Account";
      myDiv = document.getElementById("divCont");
      myDiv.appendChild(myInsert);
    
      myInsert.addEventListener('click', function() {
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const username = usernameInput.value;
        const password = passwordInput.value;
    
        fetch('/create-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
          // Aici poți trata răspunsul primit de la server
          console.log(data);
        })
        .catch(error => {
          // Aici poți trata orice eroare a apărut în timpul trimiterii cererii sau primirii răspunsului
          console.error(error);
        });
      });
    }, { once: true });
    

    

    const Joculet = document.getElementById("joculet");

    

    Joculet.addEventListener("mouseleave", function() {
      followImage.style.display = "none";
    });

    Joculet.addEventListener("mouseenter", function() {
      followImage.style.display = "block";
    });
    
    Joculet.addEventListener('mousemove',function(event){
        var followImage = document.getElementById("followImage");
        var imageWidth = followImage.offsetWidth;
        var imageHeight = followImage.offsetHeight;
        var x = event.clientX - (imageWidth / 2);
        var y = event.clientY - (imageHeight / 2);
        followImage.style.left = x + "px";
        followImage.style.top = y + "px";
    })

    Joculet.addEventListener("click", function(event) {
      var x = event.clientX - Joculet.getBoundingClientRect().left;
      var y = event.clientY - Joculet.getBoundingClientRect().top;

      var newImage = document.createElement("img");
      newImage.style.width = '50px';
      newImage.style.height = 'auto';
      newImage.src = "pngfind.com-steering-wheel-png-645454.png";
      newImage.style.position = "absolute";
      newImage.style.left = x - 26 + "px";
      newImage.style.top = y - 26 +"px";

      Joculet.style.position = "relative";
      Joculet.appendChild(newImage);
    });

    const images = joculet.getElementsByTagName("img");
    document.addEventListener("click", function(event) {
      const isInsideJoculet = Joculet.contains(event.target);
      
      if (!isInsideJoculet) {
        // Clicked outside joculet div, hide all images
        followImage.style.display = "none";
        for (let i = 0; i < images.length; i++) {
          images[i].style.display = "none";
        }
      }
    });

}

