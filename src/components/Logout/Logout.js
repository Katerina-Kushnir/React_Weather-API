import React from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, ListItemIcon } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { setIsRegistered } from "../../Store/Register/action";
import { useCallback } from "react";

function LogoutBtn() {
    const dispatch = useDispatch();

    const { t } = useTranslation();

    const logoutClick = useCallback(() => {
        dispatch(setIsRegistered(false));
        localStorage.setItem('isRegistered', false);
    }, [ dispatch])

    return (
        <MenuItem onClick={() => logoutClick()}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            {t("header.logout")}
        </MenuItem>
    )
}

export default LogoutBtn;