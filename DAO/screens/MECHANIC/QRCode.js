import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {crc16ccitt} from 'crc';
import QRCode from 'react-native-qrcode-svg';
import Banks from './Banks';
import {themeColors} from '../../common/theme';
import Header2 from '../../common/Header2';
import {useGetPayInfoMutation} from '../../services/Mechanic';
import {useNavigation} from '@react-navigation/native';
export default function QRCodePages({route}) {
  const navigation = useNavigation();
  const [QR, setQR] = useState('');
  const [getPayInfo] = useGetPayInfoMutation();
  const [data, setData] = useState([]);
  const [info, setInfo] = useState({
    ID: '',
    Name: '',
    Amount: '',
    Purpose: '',
    bank: '',
  });
  const {id, price} = route.params;
  useEffect(() => {
    setData([]);
    getPayInfo({id: id})
      .unwrap()
      .then(payload => {
        setData(prev => [...prev, ...payload.garage]);
      })
      .catch(error => {
        if (error.data.message === 'Token is exprired') {
          navigation.navigate('Login');
        }
      });
  }, []);
  useEffect(() => {
    data.map(val => {
      let str = '';
      Banks.map(value => {
        if (value.title === val.bank) {
          str = value.bnbId;
        }
      });
      const obj = {
        ID: val.num,
        Name: val.name.toUpperCase(),
        Amount: price.toString(),
        Purpose: val.name.toUpperCase() + ' ' + 'service payment',
        bank: str,
        bankName: val.bank,
      };
      setInfo(prev => ({...prev, ...obj}));
      CreateQR({...obj});
    });
  }, [data]);
  const CreateQR = values => {
    console.log(values);
    const GUID = '0010A000000727'; // AID của NAPAS
    const BNBID = '0006' + values.bank; // Định danh ACQ ID/ BNB ID
    const MID_CID = {
      // Merchant ID / Customer ID
      ID: '01',
      length: values.ID.length,
      value: values.ID,
    };
    const ServiceID = '0208QRIBFTTC';
    // Tổ chức thụ hưởng
    const str = BNBID + MID_CID.ID + MID_CID.length + MID_CID.value;
    const str2 = GUID + '01' + str.length + str + ServiceID;
    // Phiên bản dữ liệu
    const Payload = {
      ID: '00',
      length: '02',
      value: '01',
    };
    const PayloadStr = Payload.ID + Payload.length + Payload.value;
    // Phương thức khởi tạo
    const InitialMethod = {
      ID: '01',
      length: '02',
      value: '12',
    };
    const InitialMethodStr =
      InitialMethod.ID + InitialMethod.length + InitialMethod.value;
    // Thông tin định danh người thụ hưởng
    const CAI = {
      ID: '38',
      length: str2.length,
      value: str2,
    };
    const CAIStr = CAI.ID + CAI.length + CAI.value;
    // Mã tiền tệ
    const TransactionCurrency = {
      ID: '53',
      length: '03',
      value: '704',
    };
    const TransactionCurrencyStr =
      TransactionCurrency.ID +
      TransactionCurrency.length +
      TransactionCurrency.value;
    // Số tiền giao dịch
    const TransactionAmount = {
      ID: '54',
      length:
        values.Amount.length < 10
          ? '0' + values.Amount.length
          : values.Amount.length,
      value: values.Amount,
    };
    console.log(values.Amount.length);
    const TransactionAmountStr =
      TransactionAmount.ID + TransactionAmount.length + TransactionAmount.value;
    // Mã quốc gia
    const CountryCode = {
      ID: '58',
      length: '02',
      value: 'VN',
    };
    const CountryCodeStr =
      CountryCode.ID + CountryCode.length + CountryCode.value;
    // Thông tin bổ sung
    // const BillNum = {
    //   Id: '01',
    //   length:
    //     values.Bill.length < 10 ? '0' + values.Bill.length : values.Bill.length,
    //   value: values.Bill,
    // };
    const PurposeTran = {
      Id: '08',
      length:
        values.Purpose.length < 10
          ? '0' + values.Purpose.length
          : values.Purpose.length,
      value: values.Purpose,
    };
    const str3 = PurposeTran.Id + PurposeTran.length + PurposeTran.value;
    const OptionalInfo = {
      ID: '62',
      length: str3.length < 10 ? '0' + str3.length : str3.length,
      value: str3,
    };
    const OptionalInfoStr =
      OptionalInfo.ID + OptionalInfo.length + OptionalInfo.value;
    const input1 =
      PayloadStr +
      InitialMethodStr +
      CAIStr +
      TransactionCurrencyStr +
      TransactionAmountStr +
      CountryCodeStr +
      OptionalInfoStr +
      '6304';
    // Cyclic Redundancy Check
    const CRC = crc16ccitt(input1).toString(16).toLocaleUpperCase();
    console.log(input1);
    console.log(CRC);
    const input2 = input1 + CRC;
    setQR(input2);
  };
  return (
    <View
      style={{
        backgroundColor: themeColors.white,
        flex: 1,
      }}>
      <View
        style={{
          width: '100%',
          height: 50,
          backgroundColor: themeColors.primaryColor,
        }}></View>
      {QR.length > 0 ? (
        <View style={{marginTop: 50, flex: 1}}>
          <View
            style={{
              borderWidth: 4,
              borderColor: themeColors.primaryColor,
              padding: 10,
              alignSelf: 'center',
              borderRadius: 10,
            }}>
            <QRCode value={QR} size={250} />
          </View>
          <View style={{marginVertical: 30}}>
            <Text
              style={{
                color: themeColors.black,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
              }}>
              Tên chủ TK: {info.Name}
            </Text>
            <Text
              style={{
                color: themeColors.primaryColor,
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
                marginVertical: 5,
              }}>
              Số TK: {info.ID}
            </Text>
            <Text
              style={{
                color: themeColors.black,
                textAlign: 'center',
                fontSize: 16,
                fontWeight: '600',
              }}>
              {info.bankName}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('MeMainHome')}
            style={{
              backgroundColor: themeColors.primaryColor,
              alignSelf: 'center',
              paddingVertical: 10,
              paddingHorizontal: 30,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: themeColors.white,
                fontSize: 17,
                textAlign: 'center',
              }}>
              DONE
            </Text>
          </TouchableOpacity>
          <View style={{position: 'absolute', bottom: 0, left: 0}}>
            <Image
              source={require('../../assets/pay.jpg')}
              style={{width: 500, height: 200, opacity: 0.3}}
            />
          </View>
        </View>
      ) : (
        ''
      )}
    </View>
  );
}
