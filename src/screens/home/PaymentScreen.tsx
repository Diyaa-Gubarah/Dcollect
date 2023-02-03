import { NativeText } from "../../components";
import { PaymentProps } from "../../navigations/types";
import { withContainer } from "../../hoc";

type Props = {} & Partial<PaymentProps>;

function PaymentScreen({}: Props) {
  return (
    <>
      <NativeText color="textPrimary" size="lg">
        PaymentScreen
      </NativeText>
    </>
  );
}

export default withContainer(PaymentScreen);
