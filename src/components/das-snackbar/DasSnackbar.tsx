import { useSnackbar, type VariantType, type OptionsObject } from "notistack";
import React from "react";

interface SnackbarRef {
    enqueueSnackbar: (msg: string, options?: OptionsObject) => void;
}

let snackbarRef: SnackbarRef | null = null;

const SnackbarConfigurator: React.FC = () => {
    const snackbar = useSnackbar();
    React.useEffect(() => {
        snackbarRef = snackbar;
    }, [snackbar]);

    return null;
};

export const DasSnackbarConfig = () => (
    <SnackbarConfigurator />
);

export const DasSnackbar = {
    success(msg: string) {
        this.toast(msg, "success");
    },
    warning(msg: string) {
        this.toast(msg, "warning");
    },
    info(msg: string) {
        this.toast(msg, "info");
    },
    error(msg: string) {
        this.toast(msg, "error");
    },
    toast(msg: string, variant: VariantType = "default") {
        snackbarRef?.enqueueSnackbar(msg, { variant });
    },
};

export default DasSnackbar;