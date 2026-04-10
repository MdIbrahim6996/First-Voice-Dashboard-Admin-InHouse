import { Request, Response } from "express";
import axios from "axios";
import { COMPANY_HOUSE_API_KEY } from "../../utils/appConstants";

export const searchCompany = async (req: Request, res: Response) => {
    const { query } = req.query;
    const authHeader =
        "Basic " + Buffer.from(COMPANY_HOUSE_API_KEY + ":").toString("base64");
    // console.log(authHeader);

    const {data} = await axios.get(
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
