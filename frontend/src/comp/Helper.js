import axios from "axios";
import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";

const pub = {
  "img":process.env.PUBLIC_URL+"/img/",
  "css":process.env.PUBLIC_URL+"/css/"
}


export {pub};
