import React, { useState } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MenuItem, Avatar, Modal, Box, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Account() {
    const { t } = useTranslation();

    const [openModal, setOpenModal2] = React.useState(false);   //MUI
    const handleOpenModal = (event) => { event.stopPropagation(); setOpenModal2(true) };    //MUI
    const handleCloseModal = (event) => { event.stopPropagation(); setOpenModal2(false) };  //MUI

    const getStorageFirstname = localStorage.getItem('firstname');
    const [storageFirstname, setStorageFirstname] = useState(JSON.parse(getStorageFirstname));
    const getStorageSurname = localStorage.getItem('surname');
    const [storageSurname, setStorageSurname] = useState(JSON.parse(getStorageSurname));
    const getStoragePhone = localStorage.getItem('phone')
    const [storagePhone, setStoragePhone] = useState(JSON.parse(getStoragePhone));

    const updateData = useCallback(() => {
        localStorage.setItem("firstname", JSON.stringify(storageFirstname));
        localStorage.setItem("surname", JSON.stringify(storageSurname));
        localStorage.setItem("phone", JSON.stringify(storagePhone));
    }, [storageFirstname, storageSurname, storagePhone])

    return (
        <MenuItem onClick={handleOpenModal}>
            <Avatar /> {t("header.account")}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {t("header.data")}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {t("header.firstname")}:
                        <input value={storageFirstname} onChange={(e) => setStorageFirstname(e.target.value)} />
                        <button className="button-save" onClick={() => updateData()} >{t("header.save")}</button>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {t("header.surname")}:
                        <input value={storageSurname} onChange={(e) => setStorageSurname(e.target.value)} />
                        <button className="button-save" onClick={() => updateData()} >{t("header.save")}</button>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {t("header.phone")}:
                        <input value={storagePhone} onChange={(e) => setStoragePhone(e.target.value)} />
                        <button className="button-save" onClick={() => updateData()} >{t("header.save")}</button>
                    </Typography>
                </Box>
            </Modal>
        </MenuItem>
    )
}

export default Account