import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import Header2 from '../../common/Header2';
import {themeColors} from '../../common/theme';
export default function Reasons() {
  const B = props => (
    <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
      {props.children}
    </Text>
  );
  return (
    <View style={{flex: 1}}>
      <Header2 name="Top Reasons" />
      <ScrollView>
        <View style={{backgroundColor: themeColors.white, padding: 20}}>
          <Text
            style={{
              color: themeColors.primaryColor2,
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'left',
            }}>
            Top Reasons Why You Should Have a Roadside Assistance Membership
          </Text>
          <Text
            style={{
              color: themeColors.gray60,
              fontWeight: 'bold',
              fontSize: 14,
              paddingVertical: 10,
              textAlign: 'right',
              fontStyle: 'italic',
            }}>
            {new Date().toLocaleString()}
          </Text>
          <Image
            source={require('../../assets/process.jpg')}
            style={{width: '100%', height: 200, marginBottom: 10}}
          />
          <Text
            style={{
              color: themeColors.black,
              fontWeight: '400',
              fontSize: 15,
              textAlign: 'justify',
              fontStyle: 'italic',
            }}>
            If your vehicle breaks down in the middle of nowhere, roadside
            assistance can help you with services like towing your vehicle to a
            repair shop, jump-starting a dead battery, changing a flat tire,
            etc. Roadside assistance is an optional coverage that you can add to
            your personal auto policy so that you can have much-needed help when
            you become stranded on the side of the road. Having a roadside
            assistance membership has many advantages and there are many reasons
            why you should have it. {'\n'}Here are some reasons why you should
            have a roadside assistance membership:
          </Text>
          <Text
            style={{
              color: themeColors.black,
              textAlign: 'justify',
              marginTop: -10,
            }}>
            <B>Less Hassle While Driving</B>
            {'\n'}
            When your vehicle breaks down on the road, you can simply call the
            roadside assistance service to have it towed to a repair shop
            without worrying about bothering your friends or family. The help of
            professional towing can be extremely valuable in such situations and
            you can acquire it by having a road assistance membership.
            {'\n'}
            <B>Safety</B>
            {'\n'}
            If your car becomes undrivable, breaks down, or gets stuck, time is
            of the essence to move your vehicle and yourself out of the harm’s
            way. If you are stuck in a dangerous area, e.g. the highway, then it
            can be particularly time consuming and difficult. Roadside
            assistance can get you connected to local help as soon as possible.
            {'\n'}
            <B>Convenience</B>
            {'\n'}
            Convenience is one of the main reasons for having a roadside
            assistance membership. Vehicle breakdowns and other similar issues
            occur when you least expect them. In such situations, the help of
            roadside assistance service can be highly convenient. Whether your
            vehicle gets damaged in an accident, runs out of gas, or you lock
            your keys in the car, you won’t need to call multiple services – you
            can rely solely on the roadside assistance to get you out of the
            stressful situation.
            {'\n'}
            <B>Cost Effective</B>
            {'\n'}
            Finding multiple service shops and comparing prices for the repairs
            you need for your vehicle can be quite challenging. You could end up
            paying more than necessary. Even if you just need a fuel delivery
            service, it can cost you a lot as some companies often try to take
            advantage of the situation. With a roadside assistance membership,
            you can avoid all these hassles and save money in the process.
            Roadside assistance membership is highly cost effective, not to
            mention time saving.
            {'\n'}
            <B>Peace of Mind</B>
            {'\n'}
            Whether it is a flat tire or complete vehicle breakdown on the side
            of the road, it can cause a lot of inconvenience and make you feel
            helpless. So, you want to be prepared for such situations. With
            roadside assistance membership, you can have the peace of mind that
            professionals will always be available to provide help you when you
            need it most.
            {'\n'}
            <B>The Bottom Line</B>
            {'\n'}
            There are many things that can go wrong with your vehicle when you
            are out on the road. This makes it worthwhile to have a roadside
            assistance membership. Roadside assistance companies are renowned
            for their quality of service. If you travel by car a lot, often to
            remote locations, then the peace of mind offered by a roadside
            assistance membership is definitely worth the investment.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
