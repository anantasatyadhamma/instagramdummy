import { Dimensions } from 'react-native';

const {height, width} = Dimensions.get('window');

export const widthPercentage = (val) => {
    return width * val / 100;
};

export const heightPercentage = (val) => {
    return height * val / 100;
}