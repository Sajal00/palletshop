import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 6,
        fontSize: 14,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        marginTop: 4,
        fontSize: 12,
        color: 'red',
    },
    textContainer: {
        // margin: 5,
        // width: width
    },
    textError: {
        color: 'red',
        marginTop: 4,
        fontSize: 12,
        alignSelf: 'center'
    },
    iconContainer: {
        paddingLeft: 10,
    },
    button: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 48
    },
});