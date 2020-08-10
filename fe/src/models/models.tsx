import React from "react"

export interface LoginFormSubmit {
    email: string
    password: string
}

export interface UserRegisterForm {
    _id?: string
    firstname: string
    lastname: string
    email: string
    password: string
    designation: string
    companyID?: string
    phone: string
    city: string
    state: string
    country: string
}

export interface CompanyRegisterForm {
    _id?: string
    name: string
    domain: string
    ownerID?: string
    phone: string
    city: string
    state: string
    country: string
    zipcode: string
}