import { Request, Response } from "express";
import axios from "axios";
import { COMPANY_HOUSE_API_KEY } from "../../utils/appConstants";

export const createB2BLead = async (req: Request, res: Response) => {
    console.log(req.body);

    const data = {
        title: req.body.title ?? "",
        firstName: req.body.firstName ?? "",
        middleName: req.body.middleName ?? "",
        lastName: req.body.lastName ?? "",
        dateOfBirth: req.body.dateOfBirth ?? "",
        phone: req.body.phone ?? "",
        positionInBusiness: req.body.positionInBusiness ?? "",
        residentialAddress: req.body.residentialAddress ?? "",
        businessName: req.body.businessName ?? "",
        tradingName: req.body.tradingName ?? "",
        businessNature: req.body.businessNature ?? "",
        companyNumber: req.body.companyNumber ?? "",
        tradingSince: req.body.tradingSince ?? "",
        businessType: req.body.businessType ?? "",
        businessAddress: req.body.businessAddress ?? "",
    };
    console.log(data);
    res.send("ok");
};
export const searchCompany = async (req: Request, res: Response) => {
    const { query } = req.query;
    const authHeader =
        "Basic " + Buffer.from(COMPANY_HOUSE_API_KEY + ":").toString("base64");
    // console.log(authHeader);

    const { data } = await axios.get(
        `https://api.company-information.service.gov.uk/search/companies?q=${query}`,
        {
            headers: {
                Authorization: authHeader,
            },
        }
    );

    const companies = data?.items?.map((c: any) => ({
        name: c.title,
        number: c.company_number,
        status: c.company_status,
        address: c.address_snippet,
        companyNo: c.company_number,
        businessType: c.company_type,
    }));
    res.send(companies);
};
