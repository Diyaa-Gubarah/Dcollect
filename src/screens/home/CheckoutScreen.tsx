import { CheckoutProps } from "../../navigations/types";
import { NativeText } from "../../components";
import { withContainer } from "../../hoc";

type Props = {} & Partial<CheckoutProps>;

function CheckoutScreen({}: Props) {
  return (
    <>
      <NativeText color="textPrimary" size="lg">
        CheckoutScreen
      </NativeText>
    </>
  );
}

export default withContainer(CheckoutScreen);
