import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgMaker from '../../../components/SvgMaker';

interface Props {
    isPartner: boolean
}

function CustomMarker(props: Props) {

    const { isPartner } = props;

    return (
        <TouchableOpacity>
                <SvgMaker name={!props.hasOwnProperty('isPartner') ? 'myMarker' : isPartner ? 'partnerRestaurantMarker' : 'notPartnerRestaurantMarker'} />
        </TouchableOpacity>
    )
}

export default CustomMarker;