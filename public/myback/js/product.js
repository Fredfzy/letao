/**
 * Created by asus on 2017/11/1.
 */
$(function(){
  var currentPage = 1;
  var pageSize = 5;
  var imgArray=[];
  function rend() {
    $.ajax({
      type: "get",
      url: " /product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (data) {
        //console.log(data);
        var html = template("tpl", data);
        $('tbody').html(html);
        //分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage,//当前页
          totalPages: Math.ceil(data.total / pageSize),//总页数
          size: "small",//设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currentPage = page;
            rend();
          }
        });
      }
    });
  }
  rend();
  //表单校验
  var $form=$('#form');
  //console.log($form);
  $form.bootstrapValidator({
    //默认不校验的配置
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品的名称"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            //必须是0以上的数字
            regexp:/^[1-9]\d*$/,
            message:"请输入一个大于0的库存"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品的描述"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品的尺寸"
          },
          regexp:{
            //33-55
            regexp:/^\d{2}-\d{2}$/,
            message:"请输入正确的尺码（33-55）"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品的原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品的折扣"
          }
        }
      },
      productLogo: {
        validators: {
          notEmpty: {
            message: "请上传3张商品图片"
          }
        }
      }
    }
  });
  $form.on("success.form.bv", function (e) {
    e.preventDefault();

  })

  $('.btn_add').on("click",function(){
    $('#addProduct').modal("show");
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function (data) {
        console.log(data);
        $(".dropdown-menu").html( template("tpl2", data) );
      }
    });
  })
  //一级分类下拉列表框,点击选中
  $('.dropdown-menu').on("click","a",function(){
    //获取a标签的内容
    $(".dropdown-text").text($(this).text());
    $("#brandId").val($(this).data("id"));
    $form.data("bootstrapValidator").updateStatus("brandId", "VALID");
  });
  //初始化产品图片上传
  $("#fileupload").fileupload({
    dataType:"json",
    done:function (e, data) {
      //console.log(data);
      //上传成功，将图片添加到img_box中
      $(".img_box").append('<img src="'+data.result.picAddr+'" width="100" height="100">');
      //数组中存储了上传的所有图片
      imgArray.push(data.result);
      //判断数组的长度，如果长度是3了，就可以修改productLogo的校验状态
      if(imgArray.length===3){
        $form.data("bootstrapValidator").updateStatus("productLogo", "VALID");
      }
      else{
        $form.data("bootstrapValidator").updateStatus("productLogo", "INVALID");
      }
    }
  });
  //点击添加商品表单信息
  $(".btn_product").on("click",function(){
    var param = $form.serialize();
    //还需要拼接3张图片的地址
    param += "&picName1="+imgArray[0].picName+"&picAddr1="+imgArray[0].picAddr;
    param += "&picName2="+imgArray[1].picName+"&picAddr2="+imgArray[1].picAddr;
    param += "&picName3="+imgArray[2].picName+"&picAddr3="+imgArray[2].picAddr;
    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:$form.serialize(),
      success:function (data) {
        //console.log(data);
        if(data.success){

          //成功的操作
          //1. 关闭模态框
          $("#addModal1").modal("hide");
          //2. 渲染第一页
          currentPage = 1;
          rend();
          //3. 重置表单
          $form[0].reset();
          $form.data("bootstrapValidator").resetForm();
          //手动把dropdown重置，把图片的地址重置
          $(".dropdown-text").text("请选择二级分类");
          $(".img_box img").remove();
          imgArray=[];
        }
      }
    });
  })
})