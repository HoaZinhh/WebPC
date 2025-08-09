$(document).ready(function() {
  $("#contactForm").validate({
    errorClass: 'input-error',
    validClass: 'input-valid',
    errorElement: 'span',
    rules: {
      fullname: "required",
      email: {
        required: true,
        email: true
      },
      support_type: "required",
      message: {
        required: true,
        minlength: 10
      },
      agree: "required"
    },
    messages: {
      fullname: "Vui lòng nhập họ tên",
      email: {
        required: "Vui lòng nhập email",
        email: "Email không hợp lệ"
      },
      support_type: "Vui lòng chọn phương thức hỗ trợ",
      message: {
        required: "Bạn chưa nhập nội dung",
        minlength: "Nội dung phải có ít nhất 10 ký tự"
      },
      agree: "Bạn cần đồng ý với điều khoản"
    },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
    },
    errorPlacement: function(error, element) {
      if (element.attr("type") === "checkbox" || element.attr("type") === "radio") {
        error.insertAfter(element.closest("label"));
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function(form) {
      form.submit();
    },
    invalidHandler: function(event, validator) {
      const errors = validator.numberOfInvalids();
      if (errors) {
        alert(`Có ${errors} trường chưa hợp lệ, vui lòng kiểm tra lại.`);
      }
    }
  });
});
