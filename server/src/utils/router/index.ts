import express from "express";

export default class Router {
  static getInstance () {
    return express.Router();
  }
}
