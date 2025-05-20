import React, { useState } from "react";

import StyledSwitch from "../../components/generic-components/StyledSwitch";

const Dashboard: React.FC = (props) => {
    const [checked, setChecked] = useState<boolean>(false);

    return (
        <>
            <StyledSwitch labelLeft={"ttt"} checked={checked} onChange={() => setChecked(!checked)} />
        </>
    );
};

export default Dashboard;
