const fs=require("fs");const D=JSON.parse(fs.readFileSync("_completed.json","utf8"));const{fc,nav,footer,sb,pdf}=D;
// Pages will be appended
console.log("Base ready");const nl=String.fromCharCode(10);const h='<!DOCTYPE html>'+nl+'<html lang="en">'+nl+'<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>';console.log(h.length);
