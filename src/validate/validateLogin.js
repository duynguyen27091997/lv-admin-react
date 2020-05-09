export default function validate(values) {
    let errors = {};
    //validate name
    if (!values.username)
        errors.username = 'Tên đăng nhập không được để trống !';

    //validate password
    if (!values.password)
        errors.password = 'Mật khẩu không được để trống !';
    else if (values.password.length < 4)
        errors.password = 'Mật khẩu không ít hơn 4 kí tự !';
    return errors;
}