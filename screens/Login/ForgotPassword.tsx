import React, { useState } from 'react';
import {
  Button,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
  useToast,
  Toast,
  Box,
  Icon,
  ToastTitle,
  InputField,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  ButtonText,
  Image,
  ArrowLeftIcon,
  Heading,
  Center,
} from '@gluestack-ui/themed';
import GuestLayout from '../../layouts/GuestLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Keyboard } from 'react-native';

import { AlertTriangle } from 'lucide-react-native';

import { Link as ExpoRouterLink, router } from 'expo-router';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email(),
});
type SignUpSchemaType = z.infer<typeof forgotPasswordSchema>;

function Header() {
  return (
    <HStack space="md" px="$3" py="$4.5" alignItems="center">
      <ExpoRouterLink href="..">
        <Icon size="6" as={ArrowLeftIcon} color="$textLight50" />
      </ExpoRouterLink>
      <Text color="$textLight50" fontSize="$lg">
        Forgot Password 
      </Text>
    </HStack>
  );
}

function SideContainerWeb() {
  return (
    <Center
      pt="$9"
      pb="$12"
      px="$4"
      sx={{
        '@base': {
          _light: { bg: '$backgroundLight0' },
          _dark: { bg: '$backgroundDark800' },
        },
        '@md': {
          flex: 1,
          _light: { bg: '$primary500' },
          _dark: { bg: '$primary500' },
          py: '$48',
          px: '$12',
        },
      }}
    >
      <Image
        resizeMode={'contain'}
        w="$80"
        h="$40"
        source={require('./assets/images/forgotPassword_web_dark.png')}
        alt="Alternate Text"
      />
    </Center>
  );
}

function MobileScreenImage() {
  return (
    <Center
      px="$4"
      mb={-0.5}
      sx={{
        '@base': {
          _light: { bg: '$backgroundLight0' },
          _dark: { bg: '$backgroundDark800' },
        },
        '@md': {
          py: '$48',
          px: '$12',
          _light: { bg: '$primary500' },
          _dark: { bg: '$primary700' },
        },
      }}
    >
      <Image
        sx={{
          '@base': {
            _light: { display: 'flex' },
            _dark: { display: 'none' },
            mt: '$12',
          },
          '@md': {
            _light: { display: 'none' },
            _dark: { display: 'none' },
          },
        }}
        source={require('./assets/images/forgotPassword_mobile_light.png')}
        h="$40"
        w="$48"
        resizeMode="contain"
        alignSelf="center"
      />
      <Image
        sx={{
          '@base': {
            _light: { display: 'none' },
            _dark: { display: 'flex' },
          },
          '@md': { display: 'none' },
          mt: '$12',
        }}
        source={require('./assets/images/forgotPassword_mobile_dark.png')}
        h="$40"
        w="$48"
        resizeMode="contain"
        alignSelf="center"
      />
    </Center>
  );
}

export default function ForgotPassword() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const toast = useToast();

  const onSubmit = (_data: SignUpSchemaType) => {
    toast.show({
      placement: 'bottom right',
      render: ({ id }) => {
        return (
          <Toast nativeID={id} variant="accent" action="success">
            <ToastTitle>OTP sent successfully </ToastTitle>
          </Toast>
        );
      },
    });
    reset();

    // Navigate screen to appropriate location    
    router.push('/verify-otp');
  };

  const handleKeyPress = () => {
    Keyboard.dismiss();
    handleSubmit(onSubmit)();
  };

  return (
    <GuestLayout>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        enableOnAndroid={true}
      >
        <VStack
          sx={{
            '@md': { flexDirection: 'row' },
            '_dark': { bg: '$backgroundDark900' },
          }}
          flex={1}
          bg="$primary500"
        >
          <Box sx={{ '@md': { display: 'none' } }}>
            <Header />
            <MobileScreenImage />
          </Box>
          <Box sx={{ '@md': { display: 'flex' } }} display="none" flex={1}>
            <SideContainerWeb />
          </Box>
          <Box
            pt="$0"
            pb="$8"
            px="$4"
            bg="$backgroundLight0"
            flex={1}
            sx={{
              '@md': {
                  pt: '$8',
                  px: '$8',
              },
              '_dark': { bg: '$backgroundDark800' },
            }}
          >
            <Box flex={1} justifyContent="space-between">
              <Box>
                <VStack
                  space="md"
                  alignItems="center"
                  sx={{ '@md': { alignItems: 'flex-start' } }}
                >
                  <Heading
                    fontSize="$xl"
                    color="$textLight800"
                    textAlign="center"
                    sx={{
                      '@md': {
                        textAlign: 'left',
                        fontSize: '$2xl',
                      },
                      '_dark': { color: '$textDark50' },
                    }}
                  >
                    Forgot Password?
                  </Heading>
                  <Text
                      color="$textLight800"
                      fontSize="$sm"
                      fontWeight="normal"
                      textAlign="center"
                      sx={{
                      '@md': {
                          textAlign: 'left',
                      },
                      '_dark': { color: '$textDark400' },
                      }}
                  >
                    Not to worry! Enter email address associated with your
                    account and we'll send a link to reset your password.
                  </Text>
                </VStack>
                <VStack space="sm" mt="$9">
                  <FormControl
                      mb="$8"
                      isInvalid={
                      (!!errors.email || isEmailFocused) && !!errors.email
                      }
                      isRequired={true}
                  >
                      <Controller
                      defaultValue=""
                      name="email"
                      control={control}
                      rules={{
                          validate: async (value) => {
                          try {
                              await forgotPasswordSchema.parseAsync({ email: value });
                              return true;
                          } catch (error: any) {
                              return error.message;
                          }
                          },
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input>
                          <InputField
                              fontSize={'$sm'}
                              placeholder="Email"
                              type="text"
                              value={value}
                              onChangeText={onChange}
                              onBlur={onBlur}
                              onSubmitEditing={handleKeyPress}
                              returnKeyType="done"
                          />
                          </Input>
                      )}
                      />
                      <FormControlError>
                      <FormControlErrorIcon as={AlertTriangle} />
                      <FormControlErrorText>
                          {errors?.email?.message}
                      </FormControlErrorText>
                      </FormControlError>
                  </FormControl>
                  <Button
                    variant="solid"
                    size="lg"
                    onPress={handleSubmit(onSubmit)}
                  >
                    <ButtonText fontSize={'$sm'}>Send OTP</ButtonText>
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Box>
        </VStack>
      </KeyboardAwareScrollView>
    </GuestLayout>
  );
}