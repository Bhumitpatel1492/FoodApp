import { StyleSheet } from "react-native";
import color from '../../Utils/color';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: color.WHITE,
    padding: 10
  },
  imgstyle:
  {
    width: wp(98),
    height: hp(50),
    borderRadius: 53,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40
  },

  itemtxt:
  {
    fontSize: hp(2.2),
    fontWeight: '500',
    color: color.BLACK,
    marginTop: 10
  },
  nameview:
  {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: "space-around",
    alignItems: "center"
  },
  btnstyle:
  {
    borderRadius: hp(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.YELLOW,
    height: hp(7),
    width: hp(18)
  },
  clockview:
  {
    height: hp(17),
    width: hp(9),
    backgroundColor: color.YELLOW,
    borderRadius: hp(9),
    justifyContent: "center",
    alignItems: "center"
  },
  subview:
  {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: hp(3.5),
    height: hp(7),
    width: hp(7),
    backgroundColor: color.WHITE
  },
  iconsty:
  {
    height: hp(8),
    width: hp(4)
  },
  detailstxt:
  {
    fontSize: hp(2.2),
    fontWeight: "700",
    color: color.BLACK,
    textAlign: "center"
  },
  basicdetailsview: { marginTop: hp(3), flexDirection: "row", justifyContent: 'space-around', alignItems: "center" },
  lodingmainview:
    { flexDirection: "row", justifyContent: 'space-around', alignItems: "center", marginTop: hp(1) },
  lodingsubview:
    { height: hp(7), width: hp(7), borderRadius: hp(3.5) },
  lodinglittle:
    { marginTop: hp(1), height: hp(2), width: hp(3), borderRadius: 4 },
  lodingtxt: { marginTop: hp(0.5), height: hp(2), width: hp(3), borderRadius: 4 }
});