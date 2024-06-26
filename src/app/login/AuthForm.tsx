import {
  Anchor,
  Button,
  Checkbox,
  Flex,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useToggle } from '@mantine/hooks'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// import { GoogleLoginButton } from 'react-social-login-buttons'
import { ROUTE_PATHS } from '@/consts/route-paths'
// import AuthService from '@/services/auth.service'

const AuthenticationForm = () => {
  const [termsIsNotChecked, setTermsIsNotChecked] = useState(true)
  const [isNotValidForm, setIsNotValidForm] = useState(true)
  const [submittedForm, setSubmittedForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  // const [googleTextColor, setGoogleTextColor] = useState('white')
  const { defaultRadius } = useMantineTheme()
  // const authService = new AuthService()
  const router = useRouter()

  // const onLoginClick = async () => {
  //   authService.getGoogleLoginUrl()
  // const data = await signIn('google')
  // console.log('data on google click', data);
  // }

  const [type, toggle] = useToggle<'login' | 'register'>(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      terms: false,
    },

    validate: {
      terms: (val) => (val ? null : 'You must agree to our terms before registering'),
      username: (val) =>
        val && val.length > 1 ? null : 'Username should be at least 2 characters',
      email: (val) => (emailIsValid(val || '') ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  const emailIsValid = (email: string): boolean => {
    if (!email || email.length < 5 || !email.includes('@') || !email.includes('.')) return false
    return true
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmittedForm(true)
    const { username, email, password } = form.values
    try {
      if (type === 'login') {
        await axios('/api/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ email, password }),
        })
        window.location.replace(ROUTE_PATHS.PROFILE.INDEX)
        setSubmittedForm(false)
      } else if (type === 'register') {
        await axios('/api/auth/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ username, email, password }),
        })
        window.location.replace(ROUTE_PATHS.PROFILE.INDEX)
        setSubmittedForm(false)
      }
    } catch (err) {
      setSubmittedForm(false)
      setErrorMessage('Something went wrong. Please refresh and try again.')
      console.log(err)
    }
  }

  const handleForgotPassword = () => {
    router.push(ROUTE_PATHS.FORGOT_PASSWORD)
  }

  const handleToggle = () => {
    toggle()
    form.setFieldValue('terms', false)
  }

  const checkIsFormValid = () => {
    if (type === 'login') {
      setIsNotValidForm(false)
      return
    }

    setIsNotValidForm(!form.isValid())
  }

  useEffect(() => {
    checkIsFormValid()
  }, [form.errors])

  useEffect(() => {
    setTermsIsNotChecked(!form.isValid('terms'))
  }, [form.values.terms])

  return (
    <Paper
      radius="md"
      p="xl"
      withBorder
      shadow="md"
      m="xl"
      style={{ borderRadius: defaultRadius }}
      w="30vw"
      miw={270}
      opacity={submittedForm ? 0.51 : 1}
    >
      <Stack align="center">
        <Text size="lg" fw={500}>
          Welcome to SeaTheMoss!
        </Text>
        <Group gap="sm">
          <Text size="xl" fw={600}>
            {type[0].toUpperCase() + type.slice(1)}
          </Text>
        </Group>
        <Anchor
          component="button"
          type="button"
          c="dimmed"
          onClick={() => handleToggle()}
          size="xs"
          mr="sm"
          disabled={submittedForm}
        >
          {type === 'register'
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </Anchor>
      </Stack>

      <form onSubmit={handleSubmit}>
        <Stack>
          {type === 'register' && (
            <TextInput
              styles={{ input: { height: '42px', fontSize: '18px', borderRadius: defaultRadius } }}
              label="Username"
              placeholder="Username"
              value={form.values.username}
              onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
              error={!form.isValid('username') && 'Username should be at least 2 characters'}
              radius="md"
              required
              disabled={submittedForm}
            />
          )}

          <TextInput
            styles={{ input: { height: '42px', fontSize: '18px', borderRadius: defaultRadius } }}
            label="Email"
            placeholder="your-email@google.com"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={type === 'register' && !form.isValid('email') && 'Invalid email'}
            radius="md"
            required
            disabled={submittedForm}
          />

          <PasswordInput
            styles={{ input: { height: '42px', fontSize: '18px', borderRadius: defaultRadius } }}
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={
              type === 'register' &&
              !form.isValid('password') &&
              'Password should include at least 6 characters'
            }
            radius="md"
            required
            disabled={submittedForm}
          />

          {type === 'login' && (
            <Anchor
              style={{ alignSelf: 'flex-start' }}
              component="button"
              type="button"
              c="dimmed"
              onClick={() => handleForgotPassword()}
              size="xs"
              mr="sm"
            >
              Forgot password?
            </Anchor>
          )}

          {type === 'register' && (
            <Flex align={'center'} justify={'flex-start'} wrap={'wrap'} h={51}>
              <Checkbox
                label="Accept the "
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                disabled={submittedForm}
                size="sm"
                c="gray"
                mr={4}
                miw={'96px'}
              />
              <Anchor
                c="teal"
                key={'terms and conditions'}
                href={'/terms-of-service'}
                lh={1}
                size="sm"
                inline
                px={0}
                mx={0}
                miw={'120px'}
              >
                terms & conditions
              </Anchor>
              <Text fz={'sm'} c={'gray'} span>
                &nbsp;and&nbsp;
              </Text>
              <Anchor
                c="teal"
                key={'shipping policy'}
                href={'/shipping-policy'}
                lh={1}
                size="sm"
                inline
                px={0}
                mx={0}
                miw={'120px'}
              >
                shipping policy
              </Anchor>
            </Flex>
          )}
          {type === 'register' && termsIsNotChecked && (
            <Text fz={'sm'} fw={300} c={'red'}>
              You must agree to our terms before registering
            </Text>
          )}
        </Stack>

        {errorMessage && (
          <Text
            bg={'red'}
            size="sm"
            fw={600}
            c={'white'}
            mt={12}
            p={9}
            style={{ borderRadius: defaultRadius }}
          >
            {errorMessage}
          </Text>
        )}

        <Group justify="space-between" mt="xl">
          <Button
            type="submit"
            radius="xl"
            w="100%"
            px="md"
            h="fit-contnet"
            fz={18}
            style={{ borderRadius: defaultRadius }}
            disabled={(type === 'register' && isNotValidForm) || submittedForm}
          >
            {type[0].toUpperCase() + type.slice(1)}
          </Button>
        </Group>
      </form>

      {/* <Divider label="Or continue with provider" labelPosition="center" my="lg" /> */}

      {/* <Group grow> */}
      {/* <Button
          px={12}
          bg={'blue'}
          h={'100%'}
          miw={'100%'}
          onClick={onLoginClick}
          component={GoogleLoginButton}
          style={{ transition: '0.3s ease-in-out', borderRadius: defaultRadius }}
          onMouseEnter={() => {
            setTimeout(() => setGoogleTextColor('black'), 200)
          }}
          onMouseLeave={() => {
            setTimeout(() => setGoogleTextColor('white'), 200)
          }}
        >
          <Text c={googleTextColor} py={12}>
            Sign In{' '}
            <Text visibleFrom="xs" span c={googleTextColor}>
              With
            </Text>{' '}
            Google
          </Text>
        </Button> */}
      {/* <Button
                    px={12}
                    h={'100%'}
                    miw={'100%'} 
                    onClick={onAppleLoginClick}
                    component={AppleLoginButton}
                    style={{ transition: '0.3s ease-in-out', borderRadius: defaultRadius}} 
                    onMouseEnter={() =>  {setTimeout(() => setAppleTextColor('white'), 200);}}
                    onMouseLeave={() => {setTimeout(() => setAppleTextColor('black'), 200);}}
                >
                    <Text
                        c={appleTextColor}
                        py={12}
                    >
                        Sign In
                        {' '}
                        <Text visibleFrom='xs' span c={appleTextColor}>With</Text>
                        {' '}
                        Apple
                    </Text>
                </Button> */}
      {/* </Group> */}
    </Paper>
  )
}

export default AuthenticationForm
