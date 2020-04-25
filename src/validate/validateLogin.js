export default function validate(values) {
    let errors = {};
    //validate name
    if (!values.name)
        errors.name = 'Tên đăng nhập không được để trống !';

    //validate password
    if (!values.password)
        errors.password = 'Mật khẩu không được để trống !';
    else if (values.password.length < 6)
        errors.password = 'Mật khẩu không ít hơn 6 kí tự !';
    return errors;
}