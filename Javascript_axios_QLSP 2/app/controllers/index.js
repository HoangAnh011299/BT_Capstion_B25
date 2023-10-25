
var selectedId = null;
//selectedId ~ id của product được chọn để edit



//tạo function renderProduclist(productArr): nhận vào 1 array lên layout
function renderProduclist(productArr){
   var contentHTML = "";
   for (var i = 0; i < productArr.length; i++ ){
       var product = productArr[i];
       var trString = `<tr>
                            <td>${product.id}</td>
                            <td>${product.name}</td>
                            <td>${product.price}</td>
                            <td>${product.image}</td>
                            <td>${product.desc}</td>
                            <td>
                                <button class = ' btn btn-warning'onclick = editProduct(${product.id}) >Edit</button>
                                <button class = 'btn btn-danger' onclick = deleteProduct(${product.id}) >Delete</button>
                            </td>
                            
    </tr> `
    contentHTML +=  trString;
    
   }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
}


function  fetchFoodList(){
    turnOnLoading();
    //gọi API lấy ds sản phẩm đang có từ server
    axios({
        url: 'https://65118d24829fa0248e4054ba.mockapi.io/product',
        method:'get',
        }).then(function(res){
            turnOffLoading();
            // api trả data về thành công
            renderProduclist(res.data.reverse());
            console.log("res",res.data);
        
        })
         .catch(function(err){
            turnOffLoading();
            console.log(" 😂 ~ err:", err);
         })
    }
    fetchFoodList();

    // //  xoá 1 món ăn 
    function deleteProduct(id){
        turnOnLoading();
        console.log(" 😂 ~ deleteProduct ~ id", id);
        axios({
            url: `https://65118d24829fa0248e4054ba.mockapi.io/product/${id}`,
            method:'DELETE',
        }).then(function(res){
        console.log(" 😂 ~ deleteProduct ~ xoá thành công", res);
            fetchFoodList(); //gọi lại API lấy danh sách mới nhất từ sever sau khi xoá thành công

        })
          .catch(function(res){
            turnOffLoading();
            console.log(" 😂 ~ deleteProduct ~ xoá thất bại", res);
            
          })
        
    }
    //thêm product : gửi data lên sever
    function addProduct(){
        //lấy thông tin từ form
        var newProduct = getDataForm();
        // gọi API và đưa newproduct lên sever 

        axios({
            url: "https://65118d24829fa0248e4054ba.mockapi.io/product",
            method: "POST",
            data: newProduct,

        }).then(function(res){
          fetchFoodList();
        })
        .catch(function(res){
            console.log(" Thêm thất bại", res);
        })

    }
    function editProduct(id){
        selectedId = id;
        //lấy thông tin chi tiết từ sever dựa trên id
        axios({
            url: `https://65118d24829fa0248e4054ba.mockapi.io/product/${id}`,
            method:'GET',
        })
        .then(function(res){
            console.log(res);
            $('#myModal').modal('show')
            // đưa data từ server về lên form 
            showDataForm(res.data);
        })
        .catch(function(Err){
            console.log(Err);
        })
    }
    function updateProduct(){   
        // 1 lấy data vừa được update bởi user (form)
        var product = getDataForm();
        // 2 gọi Asiox đưa data lên sever
        axios({
            url: `https://65118d24829fa0248e4054ba.mockapi.io/product/${selectedId}`,
            method: "PUT",
            data: product,

        }).then(function(res){
          fetchFoodList();
          $('#myModal').modal('hide')

        })
        .catch(function(res){})

    }
        // 3 render lại layout với data mơi nhất
    //pending, success, fail 
    //bật loading 1 lần
    //tắt 2 lần