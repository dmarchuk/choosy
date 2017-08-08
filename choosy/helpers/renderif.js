// Just a simple method to be able to render content in templates based on some condition
export default function renderIf(condition, content) {
    if (condition) {
        return content;
    } else {
        return null;
    }
}