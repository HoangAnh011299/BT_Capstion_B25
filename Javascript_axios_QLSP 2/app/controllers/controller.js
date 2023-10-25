function getDataForm(){
    var ten = document.getElementById("TenSP").value;
    var gia = document.getElementById("GiaSP").value;
    var hinhAnh = document.getElementById("HinhSP").value;
    var moTa = document.getElementById("MoTaSP").value;
    return{
        name: ten,
        price: gia,
        img: hinhAnh,
        desc: moTa,
    };
}
function showDataForm(product){
     document.getElementById("TenSP").value = product.name;
     document.getElementById("GiaSP").value = product.price;
     document.getElementById("HinhSP").value = product.img;
     document.getElementById("MoTaSP").value = product.desc;

}


function turnOnLoading(){
    document.querySelector("#spinner").style.display = "flex";
}


function turnOffLoading(){
    document.querySelector("#spinner").style.display = "none";
    
}