import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";

const pub = {
  "img":process.env.PUBLIC_URL+"/img/",
  "css":process.env.PUBLIC_URL+"/css/"
}
const colors = [
  '#F34025',
  '#8F09A1',
  '#273F92',
  '#099EEF',
  '#038D7F',
  '#82BF4B',
  '#FEBD28',
  '#6C483C',
  '#596E80',
  '#F99620',
]
const pages = [
  'calender',
  'todo'
]

const host = 'http://localhost:8000';


export {pub, colors, host, pages};
