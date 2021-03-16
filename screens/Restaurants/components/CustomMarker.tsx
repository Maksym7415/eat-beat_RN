import React from 'react';
import { TouchableOpacity } from 'react-native';
import SvgMaker from '../../../components/SvgMaker';

interface Props {
    is_partner: boolean
}

function CustomMarker(props: Props) {

    const { is_partner } = props;

    return (
        <TouchableOpacity>
                <SvgMaker name={!props.hasOwnProperty('is_partner') ? 'myMarker' : is_partner ? 'partnerRestaurantMarker' : 'notPartnerRestaurantMarker'} />
        </TouchableOpacity>
    )
}

export default CustomMarker;