export default interface CrudModel {
    getModelName(): String;
    getBodyParameters();
    createModel(reqBody);
}