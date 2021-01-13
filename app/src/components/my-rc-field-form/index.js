import _Form from "./Form";
import Field from "./Field";
import useForm from "./useForm";

const Form = _Form;
Form.useForm = useForm;
export {Field, useForm};
export default Form;

// form如果是类组件就不能使用useRef了，得使用createRef，但是ref属性直接放在From组件上的，是拿不到对应的表单实例的，需要穿透一下。
// 需要使用forwardRef和useImperativeHandle