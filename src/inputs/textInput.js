import React, { Fragment } from "react";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Text
} from "native-base";
import { StyleSheet } from "react-native";
export default ({
  noviError,
  uspjesno,
  text,
  labelText,
  input: { onChange, ...restInput },
  tip,
  ime,
  meta: { touched, error, valid },
  passwordSecure,
  provjera
}) => {
  return (
    <Fragment>
      <Item
        error={noviError || (touched && error) ? true : false}
        success={provjera && !noviError && touched && valid ? true : false}
      >
        <Icon type={tip} name={ime} style={{ alignSelf: "center" }} />
        <Input
          secureTextEntry={passwordSecure ? true : false}
          placeholder={text}
          onChangeText={onChange}
          {...restInput}
          style={{
            padding: 0,
            paddingBottom: 5,
            fontSize: 20,
            textAlignVertical: "bottom",
            fontFamily: "Kalam-Regular"
          }}
        />
        {(noviError || (touched && error)) && <Icon name="close-circle" />}
        {provjera &&
          !noviError &&
          touched &&
          valid && <Icon name="checkmark-circle" />}
      </Item>
      {noviError && <Text style={styles.errorText}>{noviError}</Text>}
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </Fragment>
  );
};
const styles = StyleSheet.create({
  errorText: {
    fontSize: 25,
    color: "red",
    fontFamily: "Kalam-Regular"
  }
});
