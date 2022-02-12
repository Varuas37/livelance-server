export default interface MongoCrudModel {
    getModelName(): String;
    getBodyParameters();
    createModel(reqBody);
}