"use strict";

var socrataDataset = {
    metadata: null,
    DEFAULT_FORMAT: 'YYYY-MM-DD',
    readDataFile: function (filename) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", filename, false);
        xmlHttp.send();
        return $.parseJSON(xmlHttp.responseText);
    },
    getMetadata: function (datasetid) {
        var url = "https://data.medicaid.gov/api/views/metadata/v1/" + datasetid;
        //console.log("getMetadata " + datasetid);
        socrataDataset.metadata = socrataDataset.readDataFile(url);
    },
    getDatasetName: function () {
        return socrataDataset.metadata.name;
    },
    getId: function () {
        return socrataDataset.metadata.id;
    },
    getCreatedAt: function () {
        return socrataDataset.metadata.createdAt;
    },
    getUpdatedAt: function () {
        return socrataDataset.metadata.updatedAt;
    },
    getDataUpdatedAt: function () {
        return socrataDataset.metadata.dataUpdatedAt;
    },
    getMetadataUpdatedAt: function () {
        return socrataDataset.metadata.metadataUpdatedAt;
    },
    getAttribution: function () {
        return socrataDataset.metadata.attribution;
    },
    getAttributionLink: function () {
        return socrataDataset.metadata.attributionLink;
    },
    getLicense: function () {
        return socrataDataset.metadata.license;
    },
    getDomain: function () {
        return socrataDataset.metadata.domain;
    },
    getCategory: function () {
        return socrataDataset.metadata.category;
    },
    getDescription: function () {
        return socrataDataset.metadata.description;
    },
    getDataUri: function () {
        return socrataDataset.metadata.dataUri;
    },
    getWebUri: function () {
        return socrataDataset.metadata.webUri;
    },
    getProvenance: function () {
        return socrataDataset.metadata.provenance;
    },
    getTags: function () {
        return socrataDataset.metadata.tags;
    },
    getExternalId: function () {
        return socrataDataset.metadata.externalId;
    },
    getHideFromCatalog: function () {
        return socrataDataset.metadata.hideFromCatalog;
    },
    getHideFromDataJson: function () {
        return socrataDataset.metadata.hideFromDataJson;
    }
};
