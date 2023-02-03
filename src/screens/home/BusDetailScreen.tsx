import { BusDetailsProps } from "../../navigations/types";
import { NativeText } from "../../components";
import { withContainer } from "../../hoc";

type Props = {} & Partial<BusDetailsProps>;

const BusDetailsScreen = ({}: Props) => {
  // Bus details screen implementation
  return (
    <>
      <NativeText color="primary" size="lg">
        BusDetailsScreen
      </NativeText>
    </>
  );
};

export default withContainer(BusDetailsScreen);
